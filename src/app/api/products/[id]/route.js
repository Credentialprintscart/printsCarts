import connectDB from '@/lib/db';
import Product from '@/models/Product';
import mongoose from 'mongoose';
import { protect, admin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    let product;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id).populate('category', 'name');
    } else {
      // 1. Search by exact slug
      product = await Product.findOne({ slug: id }).populate('category', 'name');

      // 2. Fallback: Search by title (fuzzy/regex)
      if (!product) {
        const titlePattern = id.replace(/-/g, ' ').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        product = await Product.findOne({
          title: { $regex: new RegExp(`^${titlePattern}$`, 'i') }
        }).populate('category', 'name');
      }

      // 3. Last Resort Fallback
      if (!product) {
        const parts = id.split('-');
        const firstFewParts = parts.slice(0, Math.min(parts.length, 3)).join(' ').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (firstFewParts.length > 5) {
          product = await Product.findOne({
            title: { $regex: new RegExp(firstFewParts, 'i') }
          }).populate('category', 'name');
        }
      }
    }

    if (product) {
      return successResponse(product);
    } else {
      return errorResponse('Product not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

export async function PUT(req, { params }) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();

    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    const formData = await req.formData();
    const files = formData.getAll('images');
    const existingImagesStr = formData.get('existingImages');
    
    let imageUrls = [];
    if (existingImagesStr) {
      imageUrls = JSON.parse(existingImagesStr);
    }

    if (files && files.length > 0) {
      for (const file of files) {
        if (typeof file === 'string') continue;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageUrl = await uploadToCloudinary(buffer, file.name);
        imageUrls.push(imageUrl);
      }
    }

    const parseArrayField = (field) => {
      if (!field) return [];
      try {
        return typeof field === 'string' ? JSON.parse(field) : field;
      } catch (e) {
        return [];
      }
    };

    const title = formData.get('title');
    product.title = title || product.title;
    product.brand = formData.get('brand') || product.brand;
    product.category = formData.get('category') || product.category;
    product.price = Number(formData.get('price')) || product.price;
    product.oldPrice = Number(formData.get('oldPrice')) || product.oldPrice;
    product.countInStock = Number(formData.get('countInStock')) || product.countInStock;
    product.description = formData.get('description') || product.description;
    product.shortDetails = formData.get('shortDetails') || product.shortDetails;
    product.shortSpecification = formData.get('shortSpecification') || product.shortSpecification;
    product.overview = formData.get('overview') || product.overview;
    product.technicalSpecification = formData.get('technicalSpecification') || product.technicalSpecification;
    product.color = formData.get('color') || product.color;
    product.width = formData.get('width') || product.width;
    product.height = formData.get('height') || product.height;
    product.depth = formData.get('depth') || product.depth;
    product.screenSize = formData.get('screenSize') || product.screenSize;
    product.images = imageUrls;
    
    product.technology = parseArrayField(formData.get('technology')) || product.technology;
    product.usageCategory = parseArrayField(formData.get('usageCategory')) || product.usageCategory;
    product.allInOneType = parseArrayField(formData.get('allInOneType')) || product.allInOneType;
    product.wireless = formData.get('wireless') || product.wireless;
    product.mainFunction = parseArrayField(formData.get('mainFunction')) || product.mainFunction;

    const reviews = formData.get('reviews');
    if (reviews) {
      const parsedReviews = typeof reviews === 'string' ? JSON.parse(reviews) : reviews;
      product.reviews = parsedReviews;
      product.numReviews = parsedReviews.length;
      product.rating = parsedReviews.length > 0 ? parsedReviews.reduce((acc, item) => item.rating + acc, 0) / parsedReviews.length : 0;
    }

    if (title) {
      product.slug = title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");
    }

    const updatedProduct = await product.save();
    return successResponse(updatedProduct);
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();

    const { id } = await params;
    const product = await Product.findById(id);

    if (product) {
      await Product.findByIdAndDelete(id);
      return successResponse({ message: 'Product removed' });
    } else {
      return errorResponse('Product not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
