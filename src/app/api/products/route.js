import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { protect, admin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    
    const pageSize = 20;
    const page = Number(searchParams.get('page')) || 1;
    const categoryName = searchParams.get('category');
    const search = searchParams.get('search');
    const brand = searchParams.get('brand');
    
    let query = {};
    
    if (categoryName && categoryName !== 'undefined' && categoryName !== 'null') {
      // Escape special characters for regex
      const escapedCategory = categoryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      let category = await Category.findOne({ name: { $regex: new RegExp(`^${escapedCategory}$`, 'i') } });
      
      if (!category) {
        category = await Category.findOne({ slug: categoryName });
      }

      if (category) {
        query.category = category._id;
      } else {
        return successResponse({ products: [], page: 1, pages: 0 });
      }
    }

    if (brand && brand !== 'all') {
      const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.brand = { $regex: escapedBrand, $options: 'i' };
    }

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { title: { $regex: escapedSearch, $options: 'i' } },
        { description: { $regex: escapedSearch, $options: 'i' } },
        { shortDetails: { $regex: escapedSearch, $options: 'i' } },
        { shortSpecification: { $regex: escapedSearch, $options: 'i' } },
        { overview: { $regex: escapedSearch, $options: 'i' } },
        { technicalSpecification: { $regex: escapedSearch, $options: 'i' } },
        { brand: { $regex: escapedSearch, $options: 'i' } },
        { color: { $regex: escapedSearch, $options: 'i' } },
        { width: { $regex: escapedSearch, $options: 'i' } },
        { height: { $regex: escapedSearch, $options: 'i' } },
        { depth: { $regex: escapedSearch, $options: 'i' } },
        { screenSize: { $regex: escapedSearch, $options: 'i' } }
      ];
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name')
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return successResponse({ products, page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

export async function POST(req) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();

    const formData = await req.formData();
    const files = formData.getAll('images');
    
    let imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageUrl = await uploadToCloudinary(buffer, file.name);
        imageUrls.push(imageUrl);
      }
    } else {
      const imagesStr = formData.get('images');
      if (imagesStr) {
        imageUrls = typeof imagesStr === 'string' ? JSON.parse(imagesStr) : imagesStr;
      }
    }

    const title = formData.get('title');
    const brand = formData.get('brand');
    const category = formData.get('category');
    const price = formData.get('price');
    const oldPrice = formData.get('oldPrice');
    const countInStock = formData.get('countInStock');
    const description = formData.get('description');
    const shortDetails = formData.get('shortDetails');
    const shortSpecification = formData.get('shortSpecification');
    const overview = formData.get('overview');
    const technicalSpecification = formData.get('technicalSpecification');
    const color = formData.get('color');
    const width = formData.get('width');
    const height = formData.get('height');
    const depth = formData.get('depth');
    const screenSize = formData.get('screenSize');
    const reviews = formData.get('reviews');
    const technology = formData.get('technology');
    const usageCategory = formData.get('usageCategory');
    const allInOneType = formData.get('allInOneType');
    const wireless = formData.get('wireless');
    const mainFunction = formData.get('mainFunction');

    if (!title || !price || !category) {
      return errorResponse('Please provide title, price, and category', 400);
    }

    let parsedReviews = [];
    if (reviews) {
      parsedReviews = typeof reviews === 'string' ? JSON.parse(reviews) : reviews;
    }

    const parseArrayField = (field) => {
      if (!field) return [];
      try {
        return typeof field === 'string' ? JSON.parse(field) : field;
      } catch (e) {
        return [];
      }
    };

    const slug = title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");

    const product = new Product({
      user: user._id,
      title,
      slug,
      brand: brand || 'Generic',
      category,
      price: Number(price) || 0,
      oldPrice: oldPrice ? Number(oldPrice) : 0,
      countInStock: Number(countInStock) || 0,
      description: description || '',
      shortDetails,
      shortSpecification,
      overview,
      technicalSpecification,
      images: imageUrls,
      color, width, height, depth, screenSize,
      technology: parseArrayField(technology),
      usageCategory: parseArrayField(usageCategory),
      allInOneType: parseArrayField(allInOneType),
      wireless: wireless || '',
      mainFunction: parseArrayField(mainFunction),
      reviews: parsedReviews,
      numReviews: parsedReviews.length,
      rating: parsedReviews.length > 0 ? parsedReviews.reduce((acc, item) => item.rating + acc, 0) / parsedReviews.length : 0,
    });

    const createdProduct = await product.save();
    return successResponse(createdProduct, 201);
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
