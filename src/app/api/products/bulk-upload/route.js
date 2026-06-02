import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';
import * as XLSX from 'xlsx';

export async function POST(req) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();

    const formData = await req.formData();
    const file = formData.get('excelFile');

    if (!file) {
      return errorResponse('No file uploaded', 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const products = [];
    const errors = [];

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];
      try {
        const categoryName = row.category || row.Category;
        let category = null;
        if (categoryName) {
          category = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } });
        }

        if (!category) {
          errors.push(`Row ${i + 2}: Category "${categoryName}" not found`);
          continue;
        }

        const parseCSV = (val) => {
          if (!val) return [];
          if (Array.isArray(val)) return val;
          return String(val).split(',').map(s => s.trim()).filter(s => s !== '');
        };

        const productData = {
          user: user._id,
          brand: row.brand || row.Brand || 'Generic',
          title: row.title || row.Title || row.name || row.Name || '',
          category: category._id,
          description: row.description || row.Description || '',
          price: parseFloat(row.price || row.Price || 0),
          oldPrice: parseFloat(row.oldPrice || row['Old Price'] || 0),
          countInStock: parseInt(row.countInStock || row['Count In Stock'] || row.stock || row.Stock || 0),
          shortDetails: row.shortDetails || row['Short Details'] || '',
          shortSpecification: row.shortSpecification || row['Short Specification'] || '',
          overview: row.overview || row.Overview || '',
          technicalSpecification: row.technicalSpecification || row['Technical Specification'] || '',
          color: row.color || row.Color || '',
          width: row.width || row.Width || '',
          height: row.height || row.Height || '',
          depth: row.depth || row.Depth || '',
          screenSize: row.screenSize || row['Screen Size'] || '',
          technology: parseCSV(row.technology || row.Technology),
          usageCategory: parseCSV(row.usageCategory || row['Usage Category']),
          allInOneType: parseCSV(row.allInOneType || row['All-in-One Type']),
          wireless: row.wireless || row.Wireless || '',
          mainFunction: parseCSV(row.mainFunction || row['Main Function']),
          images: []
        };

        if (!productData.title) {
          errors.push(`Row ${i + 2}: Product title is missing`);
          continue;
        }

        // Generate slug
        const slug = productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        productData.slug = slug;

        products.push(productData);
      } catch (error) {
        errors.push(`Row ${i + 2}: ${error.message}`);
      }
    }

    if (products.length > 0) {
      await Product.insertMany(products);
    }

    return successResponse({
      message: `Successfully uploaded ${products.length} products`,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
