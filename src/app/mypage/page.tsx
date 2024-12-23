import { getGroupData } from '../../../utils/supabase/groupActions';
import { createClient } from '../../../utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
    const supabase = await createClient();
    const data = await supabase.auth.getUser();
    const user = data.data.user;
    if (!user) {
        redirect(`/login`);
    }
    const groupData = await getGroupData(user.id);
    redirect(`/mypage/${groupData.id}`);
};

// export const getServerSideProps: GetServerSideProps = async () => {
    
//     if (!user) {
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: '/login'
//             }
//         }
//     }

//     const groupData = await getGroupData(user.id);

//     return {
//         redirect: {
//             permanent: false,
//             destination: `/mypage/${groupData.id}`
//         }
//     }
// }