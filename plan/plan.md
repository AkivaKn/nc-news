**User stories**

    1. See a list of all articles.
    2. Go to a new page to read an individual article.
    3. See the comments linked with an individual article alongside it.
    4. Vote on the article that they are reading.
    5. Add a new comment to the article that they are reading.
    6. Delete their own comments only.
    7. View the different topics.
    8. Select a topic to view associated articles.
    9. Sort how the articles are presented to them.


**Pages**

    1. Home/articles list
    2. Article
    3. Topic
    4. Profile

**Components**
1. Header

2. Home
- TopicsList
- ArticlesList
    - ArticleCard

3. Article
- ArticleBody
- CommentsList
    - CommentCard

4. Topic
- TopicsList
- ArticlesList
    - ArticleCard

5. Profile
- CommentsList
    - CommentCard
- ArticlesList
    - ArticleCard


**States**
1. user
- Header
- CommentCard (Article)
- Profile
- CommentsList (Profile)
- CommentCard (Profile)
- ArticlesList (Profile)
- ArticleBody

2. currArticleId
- ArticleCard (Home)
- ArticleCard (Topic)
- Article
- CommentsList

3. topicsList
- TopicsList (Home)
- TopicsList (Topic)

4. currTopicSlug
- TopicsList (Home)
- TopicsList (Topic)
- ArticlesList (Topic)

5. articles
- ArticlesList (Home)

6. currArticle
- Article Body

7. commentsList
- CommentsList

8. currTopicArticles
- ArticlesList (Topic)

9. userDetails
- Profile

10. userComments
- CommentsList (Profile)

11. isLoading
- ArticlesList(Home)
- ArticlesList(Topic)

12. hasMore
- ArticlesList(Home)
- ArticlesList(Topic)

13. nextPageIndex
- ArticlesList(Home)
- ArticlesList(Topic)

14. isLoadingTopics
- TopicsList(Home)
- TopicsList(Topic)