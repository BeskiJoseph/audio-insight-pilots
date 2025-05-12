
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileUp, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCallContext } from "@/context/CallContext";

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { uploadCall, isLoading, uploadProgress, isProcessing } = useCallContext();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an audio file
    if (!file.type.includes("audio/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (MP3 or WAV)",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      await uploadCall(selectedFile);
      toast({
        title: "Upload successful",
        description: "Your call has been processed successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error processing your file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Call Recording</h1>
      
      <Card>
        <CardContent className="pt-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              dragActive ? "border-brand-500 bg-brand-50" : "border-gray-300"
            } transition-all`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {!isLoading && !selectedFile ? (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-100 mb-4">
                  <Upload className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold">Upload a call recording</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Drag and drop your audio file, or click to browse
                </p>
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="audio/*"
                  onChange={handleFileInput}
                />
                <p className="text-xs text-gray-400 mt-4">
                  Supported formats: MP3, WAV (Max size: 25MB)
                </p>
              </>
            ) : selectedFile && !isLoading ? (
              <div className="space-y-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">File Selected</h3>
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Button variant="outline" onClick={() => setSelectedFile(null)}>
                    Change File
                  </Button>
                  <Button onClick={handleUpload}>
                    Start Processing
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 mb-4">
                  <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold">
                  {isProcessing ? "Analyzing Call" : "Uploading File"}
                </h3>
                <div className="max-w-md mx-auto space-y-2">
                  {!isProcessing && (
                    <Progress value={uploadProgress} className="h-2 w-full" />
                  )}
                  <p className="text-sm text-gray-500">
                    {isProcessing 
                      ? "Transcribing audio and analyzing sentiment..." 
                      : `Uploading ${uploadProgress}%`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h4 className="font-medium text-blue-800">How it works</h4>
        <ol className="mt-2 text-sm text-blue-700 space-y-1 ml-4 list-decimal">
          <li>Upload your customer call recording (MP3 or WAV format)</li>
          <li>Our system transcribes the audio using advanced speech recognition</li>
          <li>AI analyzes the transcript for sentiment, emotions, and key points</li>
          <li>View detailed insights in your dashboard within minutes</li>
        </ol>
      </div>
    </div>
  );
};

export default UploadPage;
