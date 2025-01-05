'use client';
import { useState, useEffect } from 'react';
import { PlusCircle, Search, Users, Settings } from 'lucide-react';
import Link from 'next/link';

interface Group {
  _id: string;
  name: string;
  description: string;
  budget: number;
  memberCount: number;
  ownerId: {
    name: string;
    email: string;
  };
}

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '', budget: 0 });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/groups", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setGroups(data.groups);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
};

const handleCreateGroup = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGroup),
    });
    const data = await response.json();
    if (data.success) {
      setGroups([...groups, data.data.group]);
      setShowCreateModal(false);
      setNewGroup({ name: '', description: '', budget: 0 });
    }
  } catch (error) {
    console.error('Error creating group:', error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir='rtl'>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">گروه های مالی</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <PlusCircle size={20} />
          ساخت گروه 
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search groups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Groups Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir='rtl'>
          {groups.map((group) => (
            <Link href={`/groups/${group._id}`} key={group._id}>
            <div
              key={group._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{group.name}</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings size={20} />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{group.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                
                <div>
                  مانده: ${group.budget.toLocaleString()}
                </div><div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{group.memberCount}</span>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">ساخت گروه جدید</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">نام گروه</label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">توضیحات</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  rows={3}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">بودجه</label>
                <input
                  type="number"
                  value={newGroup.budget}
                  onChange={(e) => setNewGroup({ ...newGroup, budget: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  ساخت گروه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
