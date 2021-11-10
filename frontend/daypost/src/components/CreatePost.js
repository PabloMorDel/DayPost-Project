import { useContext, useState } from 'react';
import { AuthContext } from '..';
import { newPost } from '../api/newPost';
import { post } from '../api/post';

function CreatePost() {
  const [token] = useContext(AuthContext);
  const [title, setTitle] = useState();
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState();
  const [source, setSource] = useState();
  const [photo, setPhoto] = useState();
  function onPostFormSubmit(e) {
    console.log('esta haciendo algo?');
    e.preventDefault();
    console.log('esta haciendo algo?2');
    const url = `http://localhost:4001/posts/new`;
    const data = new FormData();
    data.append('title', title);
    data.append('topic', topic);
    data.append('description', description);
    data.append('source', source);
    data.append('photo', photo);
    console.log(data);
    const headers = {
      Authorization: token,
      //   'Content-Type': 'application/json',
    };

    const onSuccess = (res) => {
      console.log(data);
      console.log(res);
    };
    newPost(url, data, headers, onSuccess);
  }

  return (
    <div>
      <form onSubmit={onPostFormSubmit}>
        <label htmlFor='titleInput' onChange={(e) => setTitle(e.target.value)}>
          <input
            type='text'
            id='titleInput'
            placeholder='Title...'
            value={title}
          />
        </label>
        <label htmlFor='topicInput' onChange={(e) => setTopic(e.target.value)}>
          {/* Cambiar a select */}
          <input
            type='text'
            id='topicInput'
            placeholder='Topic...'
            value={topic}
          />
        </label>
        <label
          htmlFor='descriptionInput'
          onChange={(e) => setDescription(e.target.value)}
        >
          <textarea
            id='descriptionInput'
            placeholder='Description...'
            value={description}
          ></textarea>
        </label>
        <label
          htmlFor='sourceInput'
          onChange={(e) => setSource(e.target.value)}
        >
          <input
            type='text'
            id='sourceInput'
            placeholder='Source...'
            value={source}
          />
        </label>
        <label
          htmlFor='fileInput'
          onChange={(e) => setPhoto(e.target.files[0])}
        >
          <input type='file' id='fileInput' />
        </label>
        <button type='submit'>Post!</button>
      </form>
    </div>
  );
}

export default CreatePost;
