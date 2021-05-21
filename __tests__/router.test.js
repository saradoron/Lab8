/**
 * @jest-environment jsdom
 */
 import { pushToHistory } from '../scripts/router.js';

 describe('checking length when moving between pages', () => {
    test('goes to settings', () => {
        expect(pushToHistory('settings').length).toBe(2);
    });
    
    test('goes to entry 2', () => {
        expect(pushToHistory('entry', 2).length).toBe(3);
    });
    
    test('goes main page', () => {
        expect(pushToHistory('',).length).toBe(4);
    });

    
    
    test('settings branch', () => {
        expect(pushToHistory('settings').state).toEqual({page: 'settings'});
    });

    test('entry branch', () => {
        expect(pushToHistory('entry', 4).state).toEqual({page: 'entry4'});
    });

    test('default branch', () => {
        expect(pushToHistory('').state).toEqual({});
});
  });

