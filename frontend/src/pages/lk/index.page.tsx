import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';

const IndexPage:App.Next.NextPage = () => {
    return (
        <div>
            This is lk page
        </div>
    )
}

IndexPage.Role = ['user'];
IndexPage.getLayout = (children) => {
    return (
        <Default>
            {children}
        </Default>
    )
}

export default IndexPage