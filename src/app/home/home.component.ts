import { Component, inject } from '@angular/core';
import { MenucardComponent } from '../menucard/menucard.component';
import { CommonModule } from '@angular/common';
import { Appartmentservice } from '../services/appartmentService.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Post } from '../models/Post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenucardComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts: Post[] = [];
  error = ''; // Stores any error message
  searchText: any;
  search: any;
  filteredPosts: Post[] = [];
  favorites: string[] = []; // List of favorite post IDs

  router = inject(Router);
  userService = inject(UserService);

  constructor(
    private appartmentService: Appartmentservice,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.appartmentService.getPost().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.applyFilters();
      },
      (error: any) => {
        this.error = error.message; // Handle or display error message
      }
    );

    this.route.queryParams.subscribe((params: any) => {
      this.search = params['search'] || null;
      this.applyFilters();
    });

    // Fetch favorites
    this.userService.getFavorites().subscribe((favorites: string[]) => {
      this.favorites = favorites;
    });
  }

  applyFilters(): void {
    if (this.search) {
      this.filteredPosts = this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(this.search.toLowerCase()) ||
          post.description.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts; // No filter applied
    }
  }

  viewDetails(postId: string) {
    this.router.navigate(['/Viewpost', postId]);
  }

  addToFavorites(postId: string) {
    this.userService.addToFavourites(postId).subscribe(
      (response) => {
        if (!Array.isArray(this.favorites)) {
          this.favorites = [];
        }
        if (response) {
          if (!this.favorites.includes(postId)) {
            this.favorites.push(postId);
          }
        } else {
          console.warn('Failed to add post to favorites');
        }
      },
      (error) => {
        console.error('Error in addToFavorites', error);
      }
    );
  }

  isFavorite(postId: string): boolean {
    return Array.isArray(this.favorites) && this.favorites.includes(postId);
  }
}
