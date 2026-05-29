import connectDB from '@/lib/db';
import Chat from '@/models/Chat';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();

    const chats = await Chat.find()
      .populate('user', 'name email avatar')
      .sort({ updatedAt: -1 });
    return successResponse(chats);
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
