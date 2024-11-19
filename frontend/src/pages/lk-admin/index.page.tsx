import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';

const IndexPage:App.Next.NextPage = () => {
    return (
        <div>
            This is lk-admin page
        </div>
    )
}

// IndexPage.Role = ['admin'];
IndexPage.getLayout = (children) => {
    return (
        <Default>
            {children}
        </Default>
    )
}

export default IndexPage;