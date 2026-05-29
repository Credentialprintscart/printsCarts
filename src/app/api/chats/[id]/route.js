import connectDB from '@/lib/db';
import Chat from '@/models/Chat';
import { protect } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req, { params }) {
  try {
    const user = await protect(req);
    await connectDB();
    const { id } = await params;

    const chat = await Chat.findById(id).populate('user', 'name email avatar');

    if (chat) {
      if (chat.user._id.toString() === user._id.toString() || user.isAdmin) {
        return successResponse(chat);
      } else {
        return errorResponse('Not authorized to access this chat', 403);
      }
    } else {
      return errorResponse('Chat not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
