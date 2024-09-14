import realm from '../../index';

export const getPostData = () => {
  const postData = realm.objects('Post')[0];
  if (postData) {
    return postData;
  } else {
    // Create a new "Post" object with default values
    realm.write(() => {
      realm.create('Post', {
        post_number: 0,
        total_likes: 0,
        total_comments: 0,
      });
    });
    return postData;
  }
};

export const setPostData = newPost => {
  realm.write(() => {
    let post = realm.objects('Post')[0];
    if (post) {
      post.post_number = newPost.hasOwnProperty('post_number')
        ? newPost.post_number
        : post.post_number;
      post.total_likes = newPost.hasOwnProperty('total_likes')
        ? newPost.total_likes
        : post.total_likes;
      post.total_comments = newPost.hasOwnProperty('total_comments')
        ? newPost.total_comments
        : post.total_comments;
    }
  });
};
