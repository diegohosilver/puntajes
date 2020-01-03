import Store from 'electron-store';

export class MatchStore extends Store {
    constructor(settings) {
        super(settings);
        
        this.getMatches();
    }

    saveMatches() {
        this.set('matches', this.matches);

        return this;
    }

    getMatches() {
        this.matches = this.get('matches') || [];

        return this;
    }

    addMatch(match) {
        this.matches = [...this.matches, match];

        return this.saveMatches();
    }

    deleteMatch(match) {
        this.matches = this.matches.filter(t => t.id !== match.id);

        return this.saveMatches();
    }

    deleteAllMatches() {
        this.matches = [];

        return this.saveMatches();
    }
}