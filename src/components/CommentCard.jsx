import { useState } from "react";

export default function CommentCard({ comment }) {
    const [commentVoteChange, setCommentVoteChange] = useState(0);
    const [isCommentPatchError, setIsCommentPatchError] = useState(false)
    
    const handleVote = (vote) => {
        setCommentVoteChange((currentVote) => {
          return currentVote + vote
        })
        patchComment(comment.comment_id, vote).then(() => {
          setIsCommentPatchError(false)
        }).catch(() => {
            setIsCommentPatchError(true)
            setCommentVoteChange((currentVote) => {
              return  currentVote -vote
            })
        })
      }

    return (
        <li>
            <h3>
          {comment.author}/{new Date(comment.created_at).toDateString()}
        </h3>
            <p>{comment.body}</p>
            <div className="votes">
            <button disabled={commentVoteChange === 1} onClick={() => handleVote(1)}>+</button>
                <p>{comment.votes + commentVoteChange}</p>
                <button disabled={commentVoteChange === -1} onClick={() => handleVote(-1)}>-</button>
        {isCommentPatchError ? <p>That didn't work. Please try again.</p> : null}
            </div>
        </li>
    )
}
