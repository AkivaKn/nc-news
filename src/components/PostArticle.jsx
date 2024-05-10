import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { ThemeContext } from "../contexts/Theme";
import StyledButton from "../styling-components/StyledButton";
import { postArticle } from "../api";
import LoginDialog from "./LoginDialogBox";
import { Link } from "react-router-dom";


export default function PostArticle({ topicsList }) {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [topic, setTopic] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [articleBodyInput, setArticleBodyInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMissingTitleInput, setIsMissingTitleInput] = useState(false);
  const [isMissingTopicInput, setIsMissingTopicInput] = useState(false);
  const [isMissingArticleInput, setIsMissingArticleInput] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    if (!user || !user.username) {
      setIsDialogOpen(true);
    }
  }, []);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
    e.target.value !== "" ? setIsMissingTopicInput(false) : null;
  };

  const handleTitleInputChange = (e) => {
    setTitleInput(e.target.value);
    e.target.value !== "" ? setIsMissingTitleInput(false) : null;
  };

  const handleArticleInputChange = (e) => {
    setArticleBodyInput(e.target.value);
    e.target.value !== "" ? setIsMissingArticleInput(false) : null;
  };

  const handleImageInputChange = (e) => {
    setImageInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && user.username) {
      const article = {
        title: titleInput,
        topic: topic,
        author: user.username,
        body: articleBodyInput,
        article_img_url: imageInput,
      };
      if (titleInput && topic && article) {
        setIsPostError(false);
        e.target.disabled = true;
        setIsPosting(true);
        postArticle(article)
          .then(() => {
            setIsPosting(false);
            setIsPostError(false);
              setPostSuccess(true);
              setArticleBodyInput('');
              setImageInput('');
              setTitleInput('');
              setTopic('');
          })
          .catch((err) => {
            setIsPosting(false);
              setIsPostError(false);
              setPostSuccess(false);
              e.target.disabled = false;
          });
      } else {
          !titleInput ?
              setIsMissingTitleInput(true) : null;
           !topic?
            setIsMissingTopicInput(true):null;
          !articleBodyInput?
            setIsMissingArticleInput(true):null;
    
        }
      }
    else {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      {isDialogOpen ? <LoginDialog setIsDialogOpen={setIsDialogOpen} /> : null}

      <form id="post-article-form" onSubmit={handleSubmit}>
              <label htmlFor="title-input">Title *</label>
              {isMissingTitleInput?<p>* required field</p>:null}
        <input
          type="text"
          id={`title-input${isMissingTitleInput ? "-error" : null}`}
          value={titleInput}
          onChange={handleTitleInputChange}
        />
              <label htmlFor="post-topic-select">Topic *</label>
              {isMissingTopicInput?<p>* required field</p>:null}
              
        <select
          name="topic-select"
          id={`post-topic-select${isMissingTopicInput ? "-error" : null}`}
          className={`${theme}-card`}
          onChange={handleTopicChange}
        >
          <option value="">---choose a topic</option>
          {topicsList.map((topic) => {
            return (
              <option value={topic.slug} key={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
              <label htmlFor="article-body-input">Article *</label>
              {isMissingArticleInput?<p>* required field</p>:null}
              
        <textarea
          id={`article-body-input${isMissingArticleInput ? "-error" : null}`}
          rows="4"
          cols="50"
          value={articleBodyInput}
          onChange={handleArticleInputChange}
        ></textarea>
        <label htmlFor="image-input">Image URL</label>
        <input
          type="text"
          id="image-input"
          value={imageInput}
          onChange={handleImageInputChange}
              />
              <p>* required fields</p>
        <StyledButton>
          <button type="submit">Post article</button>
        </StyledButton>
      {isPosting?<div className="posting-message"><i className="fa-solid fa-spinner fa-spin"></i><p>Posting</p></div>:null}
          {isPostError ? <p>That didn't work. Please try again.</p> : null}
          {postSuccess ? <> <p>Your article has been posted!</p>
          <Link to={'/'}><i className="fa-solid fa-house"></i></Link>
          </> : null}
          </form>

          
    </>
  );
}
