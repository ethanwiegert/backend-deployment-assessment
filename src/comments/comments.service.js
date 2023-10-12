const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments")
    .select("*")
}

function listCommenterCount() {
  return knex("comments")
    .select("users.user_email as commenter_email")
    .countDistinct("comments.comment_id as count")
    .join("users", "comments.commenter_id", "users.user_id")
    .groupBy("commenter_email")
    .orderBy("commenter_email")
    .then((results) => {
      // Cast the "count" property to numbers in the received result
      return results.map((result) => ({
        commenter_email: result.commenter_email,
        count: Number(result.count),
      }));
    });
}



function read(commentId) {
  // your solution here
  return knex("comments")
    .select(
  "comments.comment_id",
  "comments.comment",
  "users.user_email as commenter_email",
  "posts.post_body as commented_post"
  )
  .join(
  "users",
  "comments.commenter_id",
  "users.user_id"
  )
  .join(
  "posts",
  "comments.post_id",
  "posts.post_id"
  )
  .where("comments.comment_id", commentId)
  .first()
}

module.exports = {
  list,
  listCommenterCount,
  read,
};