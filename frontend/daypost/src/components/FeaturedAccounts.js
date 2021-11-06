// import { useContext } from 'react';
// import { AuthContext } from '..';
import getPost from '../api/getPost';

function FeaturedAccounts(props) {
    // const [token] = useContext(AuthContext);
    const postUrl = 'http://localhost:4001/posts';
    getPost({
        url: postUrl,
        onSuccess: (body) => {
            // const mostlikedpost = body.posts.reduce((acc, post) => {
            //     if (post.likes > acc.likes) acc = post;
            //     return post;
            // });
            // console.log(mostlikedpost);
            // setWaiting(false);
            // setPosts(body.posts);
            const orderedpost = body.posts.sort((a, b) => {
                return a.idUser - b.idUser;
            });
            console.log('postordenados', orderedpost);
        },
        onError: (error) => {
            // setWaiting(false);
            // setError(error);
        },
    });
    return (
        <div>
            <h3>Cuentas destacadas</h3>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
    );
}

export default FeaturedAccounts;
