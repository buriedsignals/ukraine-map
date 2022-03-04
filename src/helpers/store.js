import create from 'zustand'

const useStore = create((set) => {
  return {
    router: {},
    dom: null,
    openTwitterModal: true,
    filterConflicts: true,
    filterBombing: true,
    filterTroops: true,
    updateDateJson: null,
  }
})

export default useStore
