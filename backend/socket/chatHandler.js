import Chat from "../models/chatModel";
import User from "../models/userModel";

const findChatById = async (chatId) => {
    const chat = await Chat.findById(chatId);
    return chat;
}

const findPrivateChatByChatId_UserId = async (chatId, userId) => {
    const chat = await Chat.findOne({
        _id: chatId,
        isPrivate: true,
        participants: userId,
    });
    return chat;
}

const newPrivateChatWithParticipants = async (participants) => {
    const chat = new Chat({
        isPrivate: true,
        participants,
        messages: [],
    })
    const newChat = await chat.save();
    participants.forEach(id => {
        await User.findByIdAndUpdate(id, {
            chats: [...chats, newChat._id]
        })
    });
    return newChat;
}

export { findChatById, findPrivateChatByChatId_UserId, newPrivateChatWithParticipants }