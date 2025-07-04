import teacherImg from '../../assets/teacher image.webp';
import { useNavigate } from 'react-router-dom';

const Inspire = () => {
    const navigate = useNavigate();
    return (
        <div className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-20"></div>
                            <img 
                                className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl" 
                                src={teacherImg} 
                                alt="Instructor" 
                            />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Become an Instructor
                            </h1>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Share your knowledge, inspire learners, and earn with ease! Join our platform as a teacher, create engaging courses, and reach students worldwide. Empower others while growing your expertise—start your teaching journey today!
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={() => navigate('/teacherReq')} 
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Start Teaching Today
                            </button>
                            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">500+</div>
                                <div className="text-sm text-gray-600">Active Teachers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">10K+</div>
                                <div className="text-sm text-gray-600">Students</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-indigo-600">95%</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inspire;




