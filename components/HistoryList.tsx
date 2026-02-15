import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { USER_HISTORY } from '../lib/mock-data';
import { Card } from './ui/Card';
import { Text } from './ui/Text';
import { Button } from './ui/Button';

interface HistoryListProps {
    vehicleId?: string; // If provided, filter by this vehicle ID
    limit?: number;     // Optional: Limit number of items shown
    showHeader?: boolean;
}

export const HistoryList: React.FC<HistoryListProps> = ({
    vehicleId,
    limit,
    showHeader = true
}) => {
    const navigate = useNavigate();

    // Filter history based on vehicleId
    const historyItems = vehicleId
        ? USER_HISTORY.filter(item => item.entityId === vehicleId)
        : USER_HISTORY;

    // Sort by some criteria if available? They seem reverse chronological in mock data.
    // We'll limit if requested
    const displayItems = limit ? historyItems.slice(0, limit) : historyItems;

    if (historyItems.length === 0) {
        return (
            <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-2xl mt-4">
                <Clock className="mx-auto mb-2 opacity-50" size={32} />
                <Text variant="body">לא נמצאה היסטוריית טיפולים</Text>
            </div>
        );
    }

    return (
        <div className="w-full">
            {showHeader && (
                <div className="mb-4 flex justify-between items-end">
                    <Text variant="h3" className="text-lg">
                        {'פעילות אחרונה'}
                    </Text>
                    {!vehicleId && (
                        <Button variant="ghost" size="sm" className="text-teal-600">הכל</Button>
                    )}
                </div>
            )}

            <div className="space-y-3">
                {displayItems.map((item) => (
                    <Card
                        key={item.id}
                        className="p-4 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer hover:shadow-md"
                        onClick={() => navigate(`/vehicle/${item.entityId}`)}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.status === 'Completed' ? 'bg-green-100 text-green-600' :
                            item.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                                'bg-red-100 text-red-600'
                            }`}>
                            <Clock size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-slate-800 truncate ml-2">{item.action}</span>
                                <span className="text-xs text-slate-400 font-mono whitespace-nowrap">{item.timestamp}</span>
                            </div>
                            <div className="text-sm text-slate-500 flex items-center gap-2 truncate">
                                {!vehicleId && ( // Only show entity name if listing all history
                                    <>
                                        <span className="truncate">{item.entityName}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full flex-shrink-0" />
                                    </>
                                )}
                                <span className="font-mono text-xs">{item.entityId}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
