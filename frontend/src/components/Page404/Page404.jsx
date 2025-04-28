import Button from '../Button/Button';
import { useNavigate } from 'react-router';

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="h-[179px] flex-col justify-start items-center gap-10 inline-flex">
                <div className="text-black text-[110px] font-medium font-['Inter'] leading-[115px] tracking-[3.30px] ">
                    404 Not Found
                </div>
                <div className="text-black text-base font-normal font-['Poppins'] leading-normal">
                    Your visited page not found. You may go home page.
                </div>
                <Button primary widthFull className={'mt-[30px]'} onClick={() => navigate('/')}>
                    Back to home page
                </Button>
            </div>
        </div>
    );
};

export default Page404;
