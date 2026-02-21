import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Calendar, ExternalLink } from 'lucide-react';

export default function UpcomingRenewals({ calculations, renewals: renewalsProp, onPrepare, onUpdateRenewalName }) {
  const { t } = useTranslation();
  const [completedIds, setCompletedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState('');

  const toggleComplete = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const startEditing = (renewal) => {
    setEditingId(renewal.id);
    setTempName(renewal.platform || '');
  };

  const saveEdit = (calcId, value) => {
    if (onUpdateRenewalName) onUpdateRenewalName(calcId, value);
    setEditingId(null);
    setTempName('');
  };

  // Filtrer les calculs qui expirent dans les 7 prochains jours (utilisé si renewals non fourni)
  const calculatedRenewals = (calculations || []).filter(calc => {
    if (!calc.partnership_end_date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(calc.partnership_end_date);
    endDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).sort((a, b) => new Date(a.partnership_end_date) - new Date(b.partnership_end_date));

  const renewals = Array.isArray(renewalsProp) ? renewalsProp : calculatedRenewals;

  if (renewals.length === 0) {
    return (
      <div className="mb-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm opacity-75">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-5 h-5 text-gray-400" />
          <h3 className="font-bold text-gray-400">{t('results_view.renewals_title')}</h3>
        </div>
        <p className="text-sm text-gray-400">{t('results_view.renewals_empty')}</p>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-5 h-5 text-amber-600" />
        <h3 className="font-bold text-amber-900">{t('results_view.renewals_title')}</h3>
      </div>
      <div className="space-y-3">
        {renewals.map((calc) => {
          const daysLeft = Math.ceil((new Date(calc.partnership_end_date) - new Date()) / (1000 * 60 * 60 * 24));
          const isCompleted = completedIds.includes(calc.id);

          return (
            <div
              key={calc.id}
              className={`flex items-center justify-between bg-white p-3 rounded-lg border border-amber-100 ${
                isCompleted ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 text-amber-600 rounded border-amber-300"
                  checked={isCompleted}
                  onChange={() => toggleComplete(calc.id)}
                />
                <div>
                  <div className="flex items-center gap-2">
                    {editingId === calc.id ? (
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={() => saveEdit(calc.id, tempName)}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === 'Enter') saveEdit(calc.id, tempName);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="text-sm font-semibold text-gray-900 capitalize border-b border-gray-300 focus:border-amber-500 outline-none px-1 min-w-[6rem]"
                        autoFocus
                      />
                    ) : (
                      <span
                        onDoubleClick={() => !isCompleted && startEditing(calc)}
                        className={`font-semibold text-gray-900 capitalize cursor-pointer hover:text-amber-600 transition-colors ${
                          isCompleted ? 'line-through' : ''
                        }`}
                      >
                        {calc.platform}
                      </span>
                    )}
                    <span
                      className={`text-xs text-gray-500 ${
                        isCompleted ? 'line-through' : ''
                      }`}
                    >
                      • {calc.company_size || t('results_view.client_fallback')}
                    </span>
                  </div>
                  <p
                    className={`text-xs text-amber-700 font-medium mt-0.5 ${
                      isCompleted ? 'line-through' : ''
                    }`}
                  >
                    {daysLeft === 1 ? t('results_view.expires_in_one') : t('results_view.expires_in_days', { days: daysLeft })}
                  </p>
                </div>
              </div>
              <button
                className={`text-xs font-semibold px-2 py-1 ${
                  isCompleted
                    ? 'text-amber-400 cursor-not-allowed'
                    : 'text-amber-700 hover:text-amber-900 hover:underline cursor-pointer'
                }`}
                onClick={() => !isCompleted && onPrepare && onPrepare(calc)}
                disabled={isCompleted}
              >
                {t('results_view.prepare')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

