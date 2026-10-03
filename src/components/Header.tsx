import Image from 'next/image';
import logo from '../../public/logonews.jpeg'
import NavLinkPage from './NavLinks.';

const HeaderPage = () => {
    const date = new Date();
    return (
        <header>
            <div className="relative max-w-7xl mx-auto py-4 px-2">
                <div className="flex flex-col gap-1 justify-center items-center">
                    <div className="flex gap-2 items-center">
                        <Image src={logo}
                            width={40}
                            height={40}
                            alt='logo'
                        />
                        <div className="flex flex-col ">
                            <h2 className='text-2xl font-bold text-red-700'>Bangla News 24</h2>
                            <p className='text-xs font-semibold text-gray-500'>{date.toLocaleDateString("bn-BD", {
                                dateStyle: 'full'
                            })}</p>
                        </div>
                    </div>
                    <nav className='mt-3 text-sm'>
                <NavLinkPage />
            </nav>
                </div>
                <div className="absolute right-2 top-4 ">
                    <div className="flex gap-2">
                    <button className='btn btn-sm'>সাইন ইন</button>
                    <button className='btn btn-sm bg-red-700 text-white'>সাইন আপ</button>
                </div>
                </div>
            </div>
            
        </header>
    );
};

export default HeaderPage;