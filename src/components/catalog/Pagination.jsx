export default function Pagination({page, totalPages, onChange}) {
    if (totalPages <= 1) return null;



    function getPageNumbers(){
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if(
                i === 1 ||
                i === totalPages ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(i);
            } else if (pages[pages.lenght - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages;
    }

    return(
        <div>
            {/* Prev */}
            <PageButton 
                onClick={() => onChange(page - 1)} 
                disabled={page === 1}
            >
                ‹
            </PageButton>

            {/* Números */}
            {getPageNumbers().map((p, i) => 
                p === '...' ? (
                    <span></span>
                ) : (
                    <PageButton 
                        key={p} 
                        onClick={() => onChange(p)} 
                        active={p === page}
                    >
                        {p}   
                    </PageButton>
                )
            )}

            {/* Next */}
            <PageButton 
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
            >
                ›
            </PageButton>
        </div>
    );
}

function PageButton({children, onClick, active, disabled}) {
    return(
        <button 
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}