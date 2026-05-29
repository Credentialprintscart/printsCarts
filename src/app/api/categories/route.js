import connectDB from '@/lib/db';
import Category from '@/models/Category';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({});
    return successResponse(categories);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

export async function POST(req) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();

    const { name, slug, image, description } = await req.json();
    
    if (!name) {
      return errorResponse('Category name is required', 400);
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');

    const category = new Category({
      name,
      slug: generatedSlug,
      image,
      description
    });

    const createdCategory = await category.save();
    return successResponse(createdCategory, 201);
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
