
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, CheckCircle, AlertTriangle, Brain, Sparkles, Shield, Zap, Eye, Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface PredictionResult {
  isAI: boolean;
  confidence: number;
}

const ImageDetection = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 10MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPEG or PNG)",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // ... keep existing code (health check and API call logic)
      console.log('🔍 Starting image analysis...');
      console.log('📁 File details:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });

      // Health check first
      console.log('🏥 Checking backend health...');
      const healthResponse = await fetch('http://localhost:5000/health', {
        method: 'GET',
        mode: 'cors'
      });
      
      if (!healthResponse.ok) {
        throw new Error('Backend health check failed');
      }
      console.log('✅ Backend is healthy');

      // Prepare form data
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      console.log('📤 Sending prediction request...');
      
      const response = await fetch('http://localhost:5000/api/image/predict', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });

      console.log('📥 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server error:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const responseText = await response.text();
      console.log('📄 Raw response:', responseText);
      
      let data: PredictionResult;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        throw new Error('Invalid response format from server');
      }
      
      console.log('🎯 Parsed result:', data);
      
      // Validate response structure
      if (typeof data.isAI !== 'boolean' || typeof data.confidence !== 'number') {
        throw new Error('Invalid response structure from server');
      }
      
      setResult(data);
      
      const confidencePercent = Math.round(data.confidence * 100);
      
      toast({
        title: "Analysis complete!",
        description: `Image classified as ${data.isAI ? 'AI-generated' : 'real'} with ${confidencePercent}% confidence`,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
      console.error('❌ Analysis error:', err);
      setError(errorMessage);
      
      toast({
        title: "Analysis failed",
        description: errorMessage.includes('Backend') 
          ? "Backend connection failed. Make sure Flask is running on port 5000"
          : errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Large glowing orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-0 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10 max-w-7xl">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-16 animate-fade-in">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-6 text-gray-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 px-6 py-3 rounded-xl transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl shadow-2xl animate-pulse mr-4">
                <Scan className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Detection Lab
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Advanced Error Level Analysis powered by deep learning to detect AI-generated content
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Enhanced Upload Section */}
          <Card className="shadow-2xl border-slate-700/50 bg-slate-900/40 backdrop-blur-xl animate-fade-in hover:shadow-purple-500/10 transition-all duration-500 group">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl text-white font-semibold">
                <div className="p-2 bg-purple-500/20 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-purple-400" />
                </div>
                Upload & Analyze
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="border-2 border-dashed border-slate-600/70 rounded-2xl p-12 text-center hover:border-purple-500/70 transition-all duration-300 group/upload bg-slate-800/20 backdrop-blur-sm">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover/upload:scale-110 transition-all duration-300 shadow-lg">
                    <Upload className="w-10 h-10 text-purple-400 group-hover/upload:text-purple-300" />
                  </div>
                  <p className="text-2xl font-semibold text-gray-200 mb-3">
                    Drop your image here
                  </p>
                  <p className="text-base text-gray-400 mb-4">
                    or click to browse files
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      JPEG/PNG
                    </span>
                    <span className="flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Max 10MB
                    </span>
                  </div>
                </label>
              </div>

              {preview && (
                <div className="space-y-6 animate-fade-in">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-600/50 shadow-2xl">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-80 object-contain bg-slate-800/50"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-sm font-medium">{selectedFile?.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleAnalyze}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group border-0"
                    >
                      {isLoading ? (
                        <>
                          <Brain className="w-5 h-5 mr-3 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                          Detect AI Content
                          <Sparkles className="ml-3 w-5 h-5 group-hover:animate-pulse" />
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetAnalysis} 
                      className="border-slate-600/70 text-gray-300 hover:bg-slate-700/50 py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="space-y-4 animate-fade-in bg-slate-800/30 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between text-base text-gray-300">
                    <span className="flex items-center">
                      <Brain className="w-5 h-5 mr-2 animate-pulse text-purple-400" />
                      AI Analysis in Progress
                    </span>
                    <span className="text-purple-400 font-medium">Processing...</span>
                  </div>
                  <Progress value={undefined} className="h-3 bg-slate-700 rounded-full" />
                  <p className="text-sm text-gray-400 text-center">
                    Using Error Level Analysis and deep neural networks
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Results Section */}
          <Card className="shadow-2xl border-slate-700/50 bg-slate-900/40 backdrop-blur-xl animate-fade-in delay-200 hover:shadow-cyan-500/10 transition-all duration-500">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-white font-semibold flex items-center">
                <div className="p-2 bg-cyan-500/20 rounded-lg mr-3">
                  <Brain className="w-6 h-6 text-cyan-400" />
                </div>
                Detection Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!result && !error && !isLoading && (
                <div className="text-center py-16 animate-pulse">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-12 h-12 text-gray-500" />
                  </div>
                  <p className="text-xl font-medium mb-3 text-gray-400">Awaiting Analysis</p>
                  <p className="text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Upload an image to begin AI content detection using advanced machine learning
                  </p>
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="border-red-800/50 bg-red-900/20 backdrop-blur-sm animate-fade-in rounded-xl">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertDescription className="text-red-300 text-base">
                    <strong className="block mb-2">Analysis Failed</strong>
                    {error}
                    <small className="mt-3 block text-red-400/70">
                      Check browser console for details. Ensure Flask backend is running.
                    </small>
                  </AlertDescription>
                </Alert>
              )}

              {result && (
                <div className="space-y-8 animate-fade-in">
                  <div
                    className={`p-8 rounded-2xl border-2 backdrop-blur-sm transition-all duration-700 ${
                      result.isAI
                        ? 'bg-gradient-to-br from-orange-900/30 to-red-900/20 border-orange-500/50 shadow-orange-500/20 shadow-2xl'
                        : 'bg-gradient-to-br from-green-900/30 to-emerald-900/20 border-green-500/50 shadow-green-500/20 shadow-2xl'
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      <div className={`p-3 rounded-xl mr-4 ${
                        result.isAI ? 'bg-orange-500/20' : 'bg-green-500/20'
                      }`}>
                        {result.isAI ? (
                          <AlertTriangle className="w-8 h-8 text-orange-400 animate-pulse" />
                        ) : (
                          <CheckCircle className="w-8 h-8 text-green-400 animate-pulse" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">
                          {result.isAI ? '🤖 AI-Generated' : '📸 Real Image'}
                        </h3>
                        <p className="text-base text-gray-300">
                          Detection Confidence: {Math.round(result.confidence * 100)}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-base font-semibold text-gray-200">Confidence Level</span>
                          <span className="text-lg font-bold text-white">{Math.round(result.confidence * 100)}%</span>
                        </div>
                        <Progress 
                          value={result.confidence * 100} 
                          className={`h-4 bg-slate-700/50 rounded-full ${
                            result.isAI ? '[&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-red-500' : '[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-500'
                          }`}
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-600/50">
                        <h4 className="font-semibold text-white mb-3 flex items-center">
                          <Eye className="w-5 h-5 mr-2" />
                          Analysis Summary
                        </h4>
                        <p className="text-base text-gray-300 leading-relaxed">
                          Our AI model analyzed this image using <strong>Error Level Analysis (ELA)</strong> and 
                          <strong> deep learning techniques</strong>. The image appears to be{' '}
                          <span className={`font-semibold ${result.isAI ? 'text-orange-300' : 'text-green-300'}`}>
                            {result.isAI ? 'artificially generated' : 'a genuine photograph'}
                          </span>{' '}
                          with {Math.round(result.confidence * 100)}% confidence based on compression artifacts and pixel-level inconsistencies.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={resetAnalysis}
                      className="border-purple-500/50 text-purple-300 hover:bg-purple-900/30 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm py-3 px-8 rounded-xl font-semibold"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Analyze Another Image
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageDetection;
