import { Link } from 'react-router-dom';

export const PostCategories = () => {
    const categories = {
        Uncategorized: 'Sin Categoría',
        politics: 'Política',
        science: 'Ciencia',
        society: 'Sociedad',
    };

    return (
        <ul className='post-categories'>
            <li>
                <Link to='/home'>Todas</Link>
            </li>
            {Object.keys(categories).map((cat) => {
                return (
                    <li key={cat}>
                        <Link to={`/home/${cat}`}>{categories[cat]}</Link>
                    </li>
                );
            })}
        </ul>
    );
};
