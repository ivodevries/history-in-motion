import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HistoryMap from './HistoryMap.vue'

vi.mock('maplibre-gl', () => ({
  default: { Map: vi.fn().mockImplementation(() => ({ remove: vi.fn() })) },
}))

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('HistoryMap', () => {
  it('renders a map container', () => {
    const wrapper = mount(HistoryMap)
    expect(wrapper.find('.map-container').exists()).toBe(true)
  })
})