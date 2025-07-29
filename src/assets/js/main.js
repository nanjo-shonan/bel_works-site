/**
 * ヒーローセクションの3D背景を初期化・描画するクラス
 */
class Hero3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      return; // コンテナがなければ何もしない
    }

    this.init();
    this.createSphere();
    this.addEventListeners();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.container.appendChild(this.renderer.domElement);

    this.mouse = new THREE.Vector2();
  }

  createSphere() {
    const geometry = new THREE.SphereGeometry(2.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0057ff, // ブランドカラー
      wireframe: true,
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  onWindowResize() {
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.sphere.rotation.x += 0.0005;
    this.sphere.rotation.y += 0.001;

    gsap.to(this.sphere.position, {
      x: this.mouse.x * 0.5,
      y: this.mouse.y * 0.5,
      duration: 1,
      ease: 'power2.out',
    });

    this.renderer.render(this.scene, this.camera);
  }
}

// DOMの読み込みが完了したら、3Dオブジェクトを初期化
document.addEventListener('DOMContentLoaded', () => {
  new Hero3D('hero-canvas');
});
