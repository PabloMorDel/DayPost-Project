function FeedPost({ imgSource, topic, title, likes }) {
  return (
    <div className='post'>
      <div>
        <p>{topic}</p>
      </div>
      <div>
        <strong>{title}</strong>
      </div>
      <div>
        <img src={'/memeholder.jpg'} alt='PostImage' />
      </div>
      <div>{likes}</div>
    </div>
  );
}

export default FeedPost;
