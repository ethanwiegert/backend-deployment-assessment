const knex = require("../db/connection");

function create(post) {
  //your solution here
    return knex("posts")
    .insert(post)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}


function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}



function update(postId, updatedPost) {
//your solution here
return knex("posts")
.where({post_id:postId})
.update(updatedPost)
.returning("*")
.then((a) => a[0])
}

function destroy(postId) {
 
  return knex("posts").where({ post_id:postId }).del();

}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
