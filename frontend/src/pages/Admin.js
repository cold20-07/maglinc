import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';

const Admin = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    author_role: '',
    featured_image: '',
    category: 'general',
    tags: [],
    published: false
  });
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    icon: 'map-pin',
    features: [],
    case_study_snippet: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      const { data: contacts } = await supabase
        .from('contacts')
        .select('*')
        .order('timestamp', { ascending: false });
      
      const { data: services } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      setBlogPosts(posts || []);
      setContacts(contacts || []);
      setServices(services || []);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const postData = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags,
        published_at: formData.published ? new Date().toISOString() : null
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        
        if (error) throw error;
        toast.success('Blog post updated successfully!');
      } else {
        // Generate UUID for new post
        const newPost = {
          ...postData,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { error } = await supabase
          .from('blog_posts')
          .insert([newPost]);
        
        if (error) throw error;
        toast.success('Blog post created successfully!');
      }
      
      setShowForm(false);
      setEditingPost(null);
      resetForm();
      fetchData();
    } catch (error) {
      toast.error('Error saving blog post');
      console.error(error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      author_role: post.author_role || '',
      featured_image: post.featured_image || '',
      category: post.category,
      tags: post.tags || [],
      published: post.published
    });
    setShowForm(true);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      toast.success('Blog post deleted successfully!');
      fetchData();
    } catch (error) {
      toast.error('Error deleting blog post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      author_role: '',
      featured_image: '',
      category: 'general',
      tags: [],
      published: false
    });
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Service Management Functions
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const serviceData = {
        ...serviceFormData,
        features: typeof serviceFormData.features === 'string' 
          ? serviceFormData.features.split('\n').filter(f => f.trim()) 
          : serviceFormData.features
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
        
        if (error) throw error;
        toast.success('Service updated successfully!');
      } else {
        const newService = {
          ...serviceData,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString()
        };
        
        const { error } = await supabase
          .from('services')
          .insert([newService]);
        
        if (error) throw error;
        toast.success('Service created successfully!');
      }
      
      setShowServiceForm(false);
      setEditingService(null);
      resetServiceForm();
      fetchData();
    } catch (error) {
      toast.error('Error saving service');
      console.error(error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: Array.isArray(service.features) ? service.features.join('\n') : service.features,
      case_study_snippet: service.case_study_snippet || ''
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);
      
      if (error) throw error;
      toast.success('Service deleted successfully!');
      fetchData();
    } catch (error) {
      toast.error('Error deleting service');
    }
  };

  const resetServiceForm = () => {
    setServiceFormData({
      title: '',
      description: '',
      icon: 'map-pin',
      features: [],
      case_study_snippet: ''
    });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-midnight">Admin Panel</h1>
            <p className="text-gray-600 mt-2">Manage your website content</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>

        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          {/* Blog Posts Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-midnight">Blog Posts</h2>
              <Button 
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingPost(null);
                  resetForm();
                }}
                className="bg-midnight hover:bg-midnight/90"
              >
                <Plus size={20} className="mr-2" />
                {showForm ? 'Cancel' : 'New Post'}
              </Button>
            </div>

            {showForm && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-midnight mb-6">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ 
                            ...formData, 
                            title: e.target.value,
                            slug: generateSlug(e.target.value)
                          });
                        }}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt *</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none h-24 resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none h-64 resize-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Author *</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Author Role</label>
                      <input
                        type="text"
                        value={formData.author_role}
                        onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                      >
                        <option value="general">General</option>
                        <option value="regulatory">Regulatory</option>
                        <option value="compliance">Compliance</option>
                        <option value="quality">Quality</option>
                        <option value="strategy">Strategy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                        placeholder="FDA, Regulatory, Compliance"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image</label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const url = await handleImageUpload(file);
                              if (url) {
                                setFormData({ ...formData, featured_image: url });
                              }
                            }
                          }}
                          className="hidden"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          disabled={uploadingImage}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload size={16} className="mr-2" />
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </Button>
                        <span className="text-sm text-gray-500">or enter URL below</span>
                      </div>
                      <input
                        type="url"
                        value={formData.featured_image}
                        onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.featured_image && (
                        <div className="relative inline-block">
                          <img 
                            src={formData.featured_image} 
                            alt="Preview" 
                            className="h-32 rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, featured_image: '' })}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-neon-teal focus:ring-neon-teal"
                    />
                    <label htmlFor="published" className="text-sm font-semibold text-gray-700">
                      Publish immediately
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-midnight hover:bg-midnight/90">
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingPost(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-midnight">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.slug}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{post.author}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-signal-green/10 text-signal-green rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {post.published ? (
                            <span className="flex items-center text-green-600">
                              <Eye size={16} className="mr-1" />
                              Published
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-500">
                              <EyeOff size={16} className="mr-1" />
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-midnight">Services</h2>
              <Button 
                onClick={() => {
                  setShowServiceForm(!showServiceForm);
                  setEditingService(null);
                  resetServiceForm();
                }}
                className="bg-midnight hover:bg-midnight/90"
              >
                <Plus size={20} className="mr-2" />
                {showServiceForm ? 'Cancel' : 'New Service'}
              </Button>
            </div>

            {showServiceForm && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-midnight mb-6">
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </h3>
                
                <form onSubmit={handleServiceSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        value={serviceFormData.title}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Icon *</label>
                      <select
                        value={serviceFormData.icon}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, icon: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                        required
                      >
                        <option value="map-pin">Map Pin</option>
                        <option value="file-text">File Text</option>
                        <option value="shield-check">Shield Check</option>
                        <option value="pen-tool">Pen Tool</option>
                        <option value="alert-triangle">Alert Triangle</option>
                        <option value="folder">Folder</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={serviceFormData.description}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none h-24 resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Features (one per line) *</label>
                    <textarea
                      value={typeof serviceFormData.features === 'string' ? serviceFormData.features : serviceFormData.features.join('\n')}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, features: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none h-32 resize-none"
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Case Study Snippet</label>
                    <textarea
                      value={serviceFormData.case_study_snippet}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, case_study_snippet: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-neon-teal focus:outline-none h-24 resize-none"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-midnight hover:bg-midnight/90">
                      {editingService ? 'Update Service' : 'Create Service'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowServiceForm(false);
                        setEditingService(null);
                        resetServiceForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Icon</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Features</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {services.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-midnight">{service.title}</div>
                          <div className="text-sm text-gray-500">{service.description.substring(0, 60)}...</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-neon-teal/10 text-neon-teal rounded-full text-xs font-semibold">
                            {service.icon}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {Array.isArray(service.features) ? service.features.length : 0} features
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditService(service)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteService(service.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-midnight">Contact Submissions</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-midnight">{contact.name}</td>
                        <td className="px-6 py-4 text-gray-700">{contact.email}</td>
                        <td className="px-6 py-4 text-gray-700">{contact.company || '-'}</td>
                        <td className="px-6 py-4 text-gray-700">{contact.phone || '-'}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-neon-teal/10 text-neon-teal rounded-full text-xs font-semibold">
                            {contact.lead_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {new Date(contact.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
