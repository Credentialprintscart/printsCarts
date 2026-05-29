import connectDB from '@/lib/db';
import Category from '@/models/Category';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const category = await Category.findById(id);
    if (category) {
      return successResponse(category);
    } else {
      return errorResponse('Category not found', 404);
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
    const { name, slug, image, description } = await req.json();
    const category = await Category.findById(id);

    if (category) {
      category.name = name || category.name;
      category.slug = slug || category.slug;
      category.image = image || category.image;
      category.description = description || category.description;

      const updatedCategory = await category.save();
      return successResponse(updatedCategory);
    } else {
      return errorResponse('Category not found', 404);
    }
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
    const category = await Category.findById(id);
    if (category) {
      await category.deleteOne();
      return successResponse({ message: 'Category removed' });
    } else {
      return errorResponse('Category not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
