import { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { storage } from '../lib/supabase';
import toast from 'react-hot-toast';

const TemplateUpload = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf',
      'application/vnd.openxmlmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Format file tidak didukung. Gunakan .docx, .doc, .pdf, .xlsx, atau .xls');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Ukuran file terlalu besar. Maksimal 10MB');
      return;
    }

    setUploadedFile(file);
  };

  const uploadFile = async () => {
    if (!uploadedFile) return;

    try {
      setUploading(true);
      
      // Generate unique filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${timestamp}_${uploadedFile.name}`;

      const { data, error } = await storage.uploadTemplate(uploadedFile, fileName);
      
      if (error) {
        throw error;
      }

      toast.success('Template berhasil diupload!');
      setUploadedFile(null);
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Gagal mengupload template: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upload Template Baru
        </h3>
        <p className="text-sm text-gray-600">
          Upload template dokumen yang akan digunakan oleh bot WhatsApp
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary-400 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".docx,.doc,.pdf,.xlsx,.xls"
          onChange={handleFileInput}
        />

        {uploadedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={uploadFile}
                disabled={uploading}
                className="btn-primary disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Template'}
              </button>
              <button
                onClick={removeFile}
                className="btn-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Drag & drop file template di sini
              </p>
              <p className="text-xs text-gray-500">
                atau klik untuk memilih file
              </p>
            </div>
            <button
              onClick={openFileDialog}
              className="btn-primary"
            >
              Pilih File
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>Format yang didukung: .docx, .doc, .pdf, .xlsx, .xls</p>
        <p>Ukuran maksimal: 10MB</p>
      </div>
    </div>
  );
};

export default TemplateUpload;

