document.addEventListener('DOMContentLoaded', () => {
    const sectorsContainer = document.getElementById('sectors-container');
    let isScrolling;

    // --- Infinite Scroll Logic ---
    const sectors = Array.from(sectorsContainer.children);
    sectors.forEach(sector => {
        const clone = sector.cloneNode(true);
        sectorsContainer.appendChild(clone);
    });

    let autoScrollAmount = 1; // Speed of the auto-scroll
    let scrollInterval;

    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            sectorsContainer.scrollTop += autoScrollAmount;
        }, 30); // Adjust interval for smoother or faster scroll
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    sectorsContainer.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = sectorsContainer;
        const scrollHeightHalf = scrollHeight / 2;

        if (scrollTop >= scrollHeightHalf) {
            sectorsContainer.scrollTop = scrollTop - scrollHeightHalf;
        } else if (scrollTop <= 0) {
            sectorsContainer.scrollTop = scrollTop + scrollHeightHalf;
        }
    });

    sectorsContainer.addEventListener('mouseenter', stopAutoScroll);
    sectorsContainer.addEventListener('mouseleave', startAutoScroll);

    // Initial positioning and start scroll
    sectorsContainer.scrollTop = 1;
    startAutoScroll();

    // --- Game State & Logic ---
    let turn = 1;

    const industries = [
        'Land', 'Labour', 'Energy', 'Groceries', 'Hardware', 'Pharma',
        'Retail', 'Healthcare', 'Entertainment'
    ];

    const companyNames = [
        'CyberDyne', 'OmniCorp', 'AminoCorp', 'GenLife', 'GloboChem', 'PetroInc',
        'MegaCorp', 'BioGen', 'NeuroNet', 'DataFlow', 'EcoFuel', 'GeoSource'
    ];

    function generateProposals() {
        const proposals = [];
        const usedCompanies = new Set();

        for (let i = 0; i < 3; i++) {
            const type = ['Horizontal', 'Vertical', 'Conglomerate'][Math.floor(Math.random() * 3)];
            const industry = industries[Math.floor(Math.random() * industries.length)];

            let company1, company2;

            do {
                company1 = companyNames[Math.floor(Math.random() * companyNames.length)];
            } while (usedCompanies.has(company1));
            usedCompanies.add(company1);

            do {
                company2 = companyNames[Math.floor(Math.random() * companyNames.length)];
            } while (usedCompanies.has(company2));
            usedCompanies.add(company2);

            proposals.push({
                id: i + 1,
                title: `${company1} + ${company2}`,
                description: `${type} merger in ${industry}.`
            });
        }
        return proposals;
    }

    function displayMergers(proposals) {
        const mergersContainer = document.getElementById('mergers');
        mergersContainer.innerHTML = '';
        proposals.forEach(proposal => {
            const mergerDiv = document.createElement('div');
            mergerDiv.className = 'merger';
            mergerDiv.innerHTML = `<h3>${proposal.title}</h3><p>${proposal.description}</p>`;
            // Pass the whole proposal object to blockMerger
            mergerDiv.addEventListener('click', () => blockMerger(proposal));
            mergersContainer.appendChild(mergerDiv);
        });
    }

    function blockMerger(blockedProposal) {
        console.log(`Turn ${turn}: Player blocked merger: ${blockedProposal.title}`);
        turn++;
        // Start the next turn
        startTurn();
    }

    function startTurn() {
        console.log(`Starting Turn ${turn}`);
        const newProposals = generateProposals();
        displayMergers(newProposals);
    }

    // Start the first turn
    startTurn();
});
