import { useState, useEffect } from 'react';
import { FileText, Download, Trash2, RefreshCw } from 'lucide-react';
import { storage } from '../lib/supabase';
import toast from 'react-hot-toast';

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await storage.getTemplates();
      
      if (error) {
        throw error;
      }

      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Gagal mengambil daftar template');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleDelete = async (fileName) => {
    if (!confirm('Apakah Anda yakin ingin menghapus template ini?')) {
      return;
    }

    try {
      setDeleting(fileName);
      const { error } = await storage.deleteTemplate(fileName);
      
      if (error) {
        throw error;
      }

      toast.success('Template berhasil dihapus');
      fetchTemplates(); // Refresh list
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Gagal menghapus template');
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const { data, error } = await storage.downloadTemplate(fileName);
      
      if (error) {
        throw error;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Template berhasil didownload');
    } catch (error) {
      console.error('Error downloading template:', error);
      toast.error('Gagal mendownload template');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Memuat template...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Daftar Template
          </h3>
          <p className="text-sm text-gray-600">
            {templates.length} template tersedia
          </p>
        </div>
        <button
          onClick={fetchTemplates}
          className="btn-secondary"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Belum ada template yang diupload</p>
        </div>
      ) : (
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.name}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    {template.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(template.metadata?.size || 0)} • 
                    {formatDate(template.created_at)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownload(template.name)}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(template.name)}
                  disabled={deleting === template.name}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  title="Hapus"
                >
                  {deleting === template.name ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateList;

