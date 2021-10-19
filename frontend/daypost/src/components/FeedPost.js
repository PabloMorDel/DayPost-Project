function FeedPost(imgSource) {
  return (
    <div className='post'>
      <div>
        <p>topic</p>
      </div>
      <div>
        <strong>Titulo</strong>
      </div>
      <div>
        <img src={'/memeholder.jpg'} alt='PostImage' />
      </div>
    </div>
  );
}

export default FeedPost;
