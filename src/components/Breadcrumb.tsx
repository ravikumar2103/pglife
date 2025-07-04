import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="py-3">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <button 
            className="btn btn-link p-0 text-decoration-none d-flex align-items-center"
            onClick={items[0]?.onClick}
          >
            <Home className="me-1" size={16} />
            Home
          </button>
        </li>
        {items.slice(1).map((item, index) => (
          <li 
            key={index} 
            className={`breadcrumb-item ${item.active ? 'active' : ''}`}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.active ? (
              item.label
            ) : (
              <button 
                className="btn btn-link p-0 text-decoration-none"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;