export const Pool = () => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg my-3">
            
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Id - Pool Address</div>
                <ul class="text-gray-700 text-base">
                    <li>Swap fee: 0.002</li>
                    <li>Exit fee: 0</li>
                </ul>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Atom</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Osmo</span>
            </div>
        </div>
    )
}