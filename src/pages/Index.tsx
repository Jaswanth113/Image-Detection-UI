
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Zap, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Moving particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center items-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full shadow-2xl animate-pulse">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-fade-in">
            AI Image Detector
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in">
            Discover whether an image is AI-generated or real using advanced Error Level Analysis (ELA) 
            and deep learning technology. Get instant, accurate results with confidence scores.
          </p>
          
          <Button 
            onClick={() => navigate('/detect')} 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in group"
          >
            Check Image
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <Sparkles className="ml-1 w-4 h-4 animate-pulse" />
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">AI-Powered Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Advanced deep learning model trained to identify AI-generated images with high accuracy and confidence scores.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in delay-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Error Level Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Uses ELA technique to reveal compression inconsistencies that indicate image manipulation or synthesis.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in delay-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-300">
                Get fast, reliable predictions with detailed confidence scores and visual analysis feedback.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-8">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">1</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Upload Image</h3>
                <p className="text-gray-300">Upload your image file (JPEG or PNG, up to 10MB)</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">2</div>
                <h3 className="font-semibold text-lg mb-2 text-white">AI Analysis</h3>
                <p className="text-gray-300">Our model processes the image using ELA and deep learning</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">3</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Get Results</h3>
                <p className="text-gray-300">Receive instant classification with confidence score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
