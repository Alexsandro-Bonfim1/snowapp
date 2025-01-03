import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import WarehouseManager from '../components/Warehouse/WarehouseManager';
import CreateWarehouseModal from '../components/Warehouse/CreateWarehouseModal';
import Toast from '../components/common/Toast';
import { useToast } from '../hooks/useToast';
import { warehouseService } from '../services/warehouse/warehouse.service';

const Warehouses = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast, showToast } = useToast();

  const handleCreateWarehouse = async (data: { name: string; size: string }) => {
    try {
      await warehouseService.createWarehouse(data.name, data.size);
      showToast('Warehouse created successfully', 'success');
      setShowCreateModal(false);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Warehouse Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create Warehouse
        </button>
      </div>

      <div className="grid gap-6">
        <WarehouseManager />
      </div>

      {showCreateModal && (
        <CreateWarehouseModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateWarehouse}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Warehouses;