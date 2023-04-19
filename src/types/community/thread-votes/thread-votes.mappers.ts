import { GetVotesResponseDTO } from "./thread-votes.dtos";
import { ThreadVotes } from "./thread-votes.schema";

export function threadVotesToResponseDTO(
  userId: string,
  threadVotes: ThreadVotes,
): GetVotesResponseDTO {
  return {
    threadId: threadVotes.threadId,
    upvotesCount: threadVotes.upvotes.length,
    upvoted: threadVotes.upvotes.includes(userId),
    replyVotes: threadVotes.replyVotes.map(replyVote => ({
      replyId: replyVote.replyId,
      upvotesCount: replyVote.upvotes.length,
      upvoted: replyVote.upvotes.includes(userId),
    })),
  };
}
