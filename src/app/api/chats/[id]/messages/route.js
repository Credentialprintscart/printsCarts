import connectDB from '@/lib/db';
import Chat from '@/models/Chat';
import { protect } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req, { params }) {
  try {
    const user = await protect(req);
    await connectDB();
    const { id } = await params;
    const { message } = await req.json();
    
    const chat = await Chat.findById(id);

    if (chat) {
      if (chat.user.toString() !== user._id.toString() && !user.isAdmin) {
        return errorResponse('Not authorized to send messages in this chat', 403);
      }

      const newMessage = {
        sender: user._id,
        senderModel: 'User',
        message,
        isRead: false,
        timestamp: new Date()
      };

      chat.messages.push(newMessage);
      chat.lastMessage = message;

      if (!user.isAdmin) {
        chat.unreadCount += 1;
      }

      await chat.save();

      const updatedChat = await Chat.findById(chat._id).populate('user', 'name email avatar');
      return successResponse(updatedChat);
    } else {
      return errorResponse('Chat not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
