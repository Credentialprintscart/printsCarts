import connectDB from '@/lib/db';
import Chat from '@/models/Chat';
import { protect } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req) {
  try {
    const user = await protect(req);
    await connectDB();

    let chat = await Chat.findOne({ user: user._id })
      .populate('user', 'name email avatar');

    if (!chat) {
      chat = await Chat.create({
        user: user._id,
        messages: [],
        status: 'active'
      });
      chat = await Chat.findById(chat._id).populate('user', 'name email avatar');
    }

    return successResponse(chat);
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
