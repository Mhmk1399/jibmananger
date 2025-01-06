'use client';
import { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';

interface Member {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}



export const Members = ({ groupId }: { groupId: string }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberData, setNewMemberData] = useState({
    name: '',
    phoneNumber: ''
  });

  useEffect(() => {
    fetchMembers();
  }, [groupId]);

  const fetchMembers = async () => {
    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setMembers(data.stats.groupInfo.members);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMemberData),
      });
      const data = await response.json();
      
      if (data.success) {
        await fetchMembers();
        setShowAddMemberModal(false);
        setNewMemberData({ name: '', phoneNumber: '' });
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Members</h2>
        <button
          onClick={() => setShowAddMemberModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <UserPlus size={20} />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {members.map((member) => (
            <li key={member._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.phoneNumber}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" dir='rtl'>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Member</h2>
            <form onSubmit={handleAddMember}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">نام</label>
                <input
                  type="text"
                  value={newMemberData.name}
                  onChange={(e) => setNewMemberData({...newMemberData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">شماره تماس</label>
                <input
                  type="text"
                  value={newMemberData.phoneNumber}
                  onChange={(e) => setNewMemberData({...newMemberData, phoneNumber: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
