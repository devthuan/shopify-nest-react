import images from '~/assets/images';
const Login = () => {
    return (
        <div className="w-screen h-screen bg-[#4880ff] flex justify-center items-center relative">
            <img
                width={1000}
                src={images.bgLogin}
                alt="image"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 m-auto w-[630px] h-[735.36px] bg-white rounded-3xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.03)] border border-[#b8b8b8]">
                <h1 className="w-full text-[#202224] text-[32px] font-bold font-['Nunito Sans'] text-center mt-[90px]">
                    Login to Account
                </h1>
                <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans'] text-center mt-[15px]">
                    Please enter your email and password to continue
                </div>
                <div className="w-full flex flex-col items-center justify-center mx-auto mt-[37px]">
                    <label
                        htmlFor=""
                        className="text-left w-[516px] opacity-80 text-[#202224] text-[18px] font-semibold font-['Nunito Sans']"
                    >
                        Email address:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="pl-[16px] mt-[15px] w-[516px] h-[56px] bg-[#f1f4f9] rounded-lg border border-[#d7d7d7] text-[18px]"
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div className="w-full flex flex-col items-center justify-center mx-auto mt-[37px]">
                    <label
                        htmlFor=""
                        className="text-left w-[516px] opacity-80 text-[#202224] text-[18px] font-semibold font-['Nunito Sans']"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="pl-[16px] mt-[15px] w-[516px] h-[56px] bg-[#f1f4f9] rounded-lg border border-[#d7d7d7] text-[18px]"
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <div className="w-[516px] flex items-center justify-between mx-auto mt-[24px]">
                    <div className="flex gap-[12px]">
                        <input className="w-[20px] h-[20px] rounded-md" type="checkbox" />
                        <p className="opacity-80 text-[#202224] text-[15px] font-semibold font-['Nunito Sans']">
                            Remember Password
                        </p>
                    </div>
                    <div className="opacity-80 text-[#202224] text-[15px] font-semibold font-['Nunito Sans']">
                        Forget password?
                    </div>
                </div>

                <div className="cursor-pointer w-[418px] h-[56px] opacity-90 bg-[#4880ff] rounded-lg mx-auto mt-[55px] flex justify-center items-center">
                    <div className="text-center text-white text-[18px] font-bold font-['Nunito Sans']">Sign In</div>
                </div>
                <div className="w-[516px] mx-auto flex  justify-center mt-[18px] gap-[6px]">
                    <div className=" opacity-60 text-right">
                        <span className="text-[#202224] text-lg font-semibold font-['Nunito Sans']">
                            Don’t have an account?{' '}
                        </span>
                    </div>
                    <div className=" text-right text-[#5a8cff] text-lg font-bold font-['Nunito Sans'] underline">
                        Create Account
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
