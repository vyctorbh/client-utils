/**
 * Helper class for path-related functions and methods
 *
 * The class contains general helper methods for joining, splitting, modifying and validating paths.
 */
export declare class PathHelper {
    /**
     * Trims the slash characters from the beginning and from the end of the path to avoid duplicated slashes
     * @param {string} path The source path that should be trimmed
     */
    static trimSlashes(path: string): string;
    /**
     * Splits a full path into path segments,
     * e.g.: /Root/Example('Content1') will be ["Root", "Example", "('Content1')"]
     * @param path The path to be splitted
     * @returns {string[]} the segments for the path
     */
    static getSegments(path: string): string[];
    /**
     * Checks if a specific segment is an Item segment or not (like "('Content1')")
     * @param segment The segment to be examined
     */
    static isItemSegment(segment: string): boolean;
    /**
     * Method that tells if a path is an item path or an item reference path (e.g. contains an Item segment).
     * @param {string} path Path that you want to test.
     * @returns {boolean} Returns if the given path is a path of a Content or not.
     */
    static isItemPath(path: string): boolean;
    /**
     * Returns the full path for a content based on its Id or Path
     * @param {string | number} idOrPath the Id Or Path of the content
     * @returns A full Id or Path-based url of the content (e.g.  *'/content(1)'* or *'/Root/Example/('Content')'*)
     */
    static getContentUrl(idOrPath: string | number): string;
    /**
     * Method that gets the URL that refers to a single item in the Sense/Net Content Repository
     * @param {string} path Path that you want to format.
     * @returns {string} Path in entity format e.g. /workspaces('project') from /workspaces/project
     */
    static getContentUrlByPath(path: string): string;
    /**
     * Method that gets the URL that refers to a single item in the Sense/Net Content Repository by its Id
     * @param id {number} Id of the Content.
     * @returns {string} e.g. /content(123)
     */
    static getContentUrlbyId(id: number): string;
    /**
     * Method that allows to join paths without multiple or missing slashes
     * @param args The list of the paths to join
     */
    static joinPaths(...args: string[]): string;
    /**
     * Checks if the ancestorPath is really the ancestor of the descendantPath
     * @param {string} ancestorPath the ancestor path
     * @param {string} descendantPath the descendant path
     * @returns {boolean} if the provided path is the ancestor of the descendant
     */
    static isAncestorOf(ancestorPath: string, descendantPath: string): boolean;
    /**
     * Returns the parent path from a specified path.
     * e.g. "/Root/Example/Content" will return "/Root/Example"
     *
     * "Root" will always return "Root"
     * @param path The content path
     */
    static getParentPath(path: string): string;
}
