import create from 'zustand'

const useStore = create((set) => {
  return {
    router: {},
    dom: null,
    openTwitterModal: false,
    filterConflicts: true,
    filterBombing: true,
    filterTroops: true,
    updateDateJson: null,
  }
})

export default useStore
