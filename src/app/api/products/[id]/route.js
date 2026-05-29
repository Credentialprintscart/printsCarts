import connectDB from '@/lib/db';
import Product from '@/models/Product';
import mongoose from 'mongoose';
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
        const titlePattern = id.replace(/-/g, ' ');
        product = await Product.findOne({
          title: { $regex: new RegExp(`^${titlePattern}$`, 'i') }
        }).populate('category', 'name');
      }

      // 3. Last Resort Fallback
      if (!product) {
        const parts = id.split('-');
        const firstFewParts = parts.slice(0, Math.min(parts.length, 3)).join(' ');
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
