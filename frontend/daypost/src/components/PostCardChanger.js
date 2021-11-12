function PostCardChanger({ postArray }) {
  console.log('postArray', postArray);
  const topPostsTitles = [];
  const topPostsPhotos = [];
  if (postArray.length > 0) {
    for (let i = 0; i < 5; i++) {
      topPostsTitles.push(postArray[i].title);
      topPostsPhotos.push(postArray[i].photo);
    }
  }

  // console.log(topPostsTitles, topPostsPhotos);

  return (
    <div className='carrusel'>
      <div>
        <p>Title</p>
      </div>
      <div>imagen</div>
    </div>
  );
}

export default PostCardChanger;
