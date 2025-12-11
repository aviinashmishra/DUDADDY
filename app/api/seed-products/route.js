import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const products = [
  {
    sku: 'DD-PF',
    name: 'DU DADDY Performance Formula',
    category: 'FLAGSHIP',
    description: `India's First 100% Herbal Performance Supplement. Designed for the gym-goer who demands pure, clean gains. Boosts strength, endurance, and reduces cortisol for holistic physical and mental performance. 0% chemicals.

Key Ayurvedic Herbs:
• Ashwagandha - Stress reduction & testosterone support
• Safed Musli - Strength & vitality
• Shatavari - Hormonal balance
• Kaunch Beej - Natural performance enhancer

Benefits:
✓ Holistic performance enhancement
✓ Testosterone support
✓ Stress reduction
✓ 100% Natural & Chemical-free`,
    mrp: 2499,
    price: 1999,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500']
  },
  {
    sku: 'DD-PR',
    name: 'DU DADDY Power Resin',
    category: 'PRE-WORKOUT / ENERGY',
    description: `The Natural Pre-Workout. This purified Himalayan Shilajit resin is rich in Fulvic Acid and over 80 minerals. Boosts ATP production for sustained energy and endurance without the synthetic jitters.

Key Ingredients:
• Shilajit (Purified Resin) - 80+ minerals & Fulvic Acid
• Gokshura (Tribulus) - Natural energy booster

Benefits:
✓ Sustained energy without jitters
✓ Enhanced stamina & endurance
✓ Improved oxygen flow
✓ Natural testosterone support`,
    mrp: 1999,
    price: 1599,
    images: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500', 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500']
  },
  {
    sku: 'DD-TF',
    name: 'DU DADDY Turmeric Flex',
    category: 'RECOVERY / ANTI-INFLAMMATION',
    description: `Advanced Joint & Muscle Recovery. A potent blend to combat post-workout inflammation and soreness (DOMS). Supports long-term joint mobility and strengthens connective tissue.

Key Ayurvedic Herbs:
• Turmeric (High Curcumin) - Powerful anti-inflammatory
• Guggulu - Joint health
• Shallaki (Boswellia) - Reduces inflammation
• Nirgundi - Pain relief

Benefits:
✓ Reduces post-workout inflammation
✓ Combats DOMS (Delayed Onset Muscle Soreness)
✓ Supports joint mobility
✓ Strengthens connective tissue`,
    mrp: 1799,
    price: 1449,
    images: ['https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500', 'https://images.unsplash.com/photo-1599932164574-e9007c0f8a5b?w=500']
  },
  {
    sku: 'DD-DR',
    name: 'DU DADDY Deep Rest',
    category: 'SLEEP & STRESS',
    description: `Optimized Nighttime Recovery. Intense training raises cortisol. This formula helps naturally lower stress hormones and promotes deep, restorative sleep essential for muscle repair and growth.

Key Ayurvedic Herbs:
• Ashwagandha KSM-66 - Premium stress reducer
• Brahmi - Mental calmness
• Jatamansi - Sleep quality enhancer

Benefits:
✓ Reduces cortisol levels
✓ Promotes deep, restorative sleep
✓ Mental calmness & clarity
✓ Enhanced muscle recovery`,
    mrp: 1899,
    price: 1529,
    images: ['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500']
  },
  {
    sku: 'DD-PP',
    name: 'DU DADDY Plant Protein Pro',
    category: 'SPECIALTY / PLANT PROTEIN',
    description: `The Cleanest Path to Muscle Mass. A 100% plant-based protein hybrid powder infused with Ayurvedic digestive herbs. Ensures high protein absorption and zero digestive discomfort often associated with whey.

Key Ingredients:
• Plant Protein Blend (Pea/Rice) - Complete amino profile
• Methi (Fenugreek) - Protein synthesis
• Ajwain - Digestive support

Benefits:
✓ High protein absorption
✓ Supports muscle mass growth
✓ Zero digestive discomfort
✓ 100% Plant-based & Clean`,
    mrp: 2299,
    price: 1849,
    images: ['https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500', 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500']
  },
  {
    sku: 'DD-WB',
    name: 'DU DADDY Women\'s Balance',
    category: 'SPECIALTY / WOMEN\'S HEALTH',
    description: `Performance & Hormonal Balance for Women. Specifically formulated to enhance female stamina, endurance, and manage hormonal fluctuations. Supports energy and long-term vitality for the active woman.

Key Ayurvedic Herbs:
• Shatavari - Female vitality
• Lodhra - Hormonal balance
• Ashoka - Reproductive health

Benefits:
✓ Hormonal regulation
✓ Enhanced endurance & stamina
✓ Increased vitality & energy
✓ Supports active lifestyle`,
    mrp: 1999,
    price: 1599,
    images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500']
  },
  {
    sku: 'DD-IP',
    name: 'DU DADDY Immunity Power',
    category: 'IMMUNITY / FOUNDATION',
    description: `Daily Defense & Core Strength. A modern take on traditional Rasayana medicine. Boosts the immune system, fights off seasonal illnesses, and keeps you consistent in the gym by combating fatigue.

Key Ayurvedic Herbs:
• Giloy - Immunity booster
• Tulsi - Adaptogenic properties
• Amla (Chyawanprash style) - Vitamin C powerhouse

Benefits:
✓ Strengthens immune system
✓ Supports metabolism
✓ Natural detoxification
✓ Combats fatigue & maintains consistency`,
    mrp: 1699,
    price: 1369,
    images: ['https://images.unsplash.com/photo-1550572017-4a6e8e8e1f9f?w=500', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500']
  }
]

export async function POST(request) {
  try {
    console.log('Starting product seeding...')

    // Delete all existing products
    await prisma.product.deleteMany({})
    console.log('Deleted all existing products')

    // Get or create DuDaddy store
    let store = await prisma.store.findFirst({
      where: { username: 'dudaddy' }
    })

    if (!store) {
      // Create admin user if doesn't exist
      let adminUser = await prisma.user.findFirst({
        where: { email: 'dudaddyworld@gmail.com' }
      })

      if (!adminUser) {
        adminUser = await prisma.user.create({
          data: {
            id: `user_${Date.now()}_dudaddy`,
            email: 'dudaddyworld@gmail.com',
            name: 'DuDaddy Admin',
            image: 'https://ui-avatars.com/api/?name=DuDaddy&background=dc2626&color=fff',
            role: 'admin',
            emailVerified: new Date()
          }
        })
      }

      // Create DuDaddy store
      store = await prisma.store.create({
        data: {
          userId: adminUser.id,
          name: 'DuDaddy',
          username: 'dudaddy',
          email: 'dudaddyworld@gmail.com',
          contact: '+91-1234567890',
          logo: 'https://ui-avatars.com/api/?name=DuDaddy&background=dc2626&color=fff&size=200',
          description: 'Premium Ayurvedic Performance Supplements',
          address: 'India',
          status: 'approved',
          isActive: true
        }
      })
    }

    // Create all products
    const createdProducts = []
    for (const product of products) {
      const created = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          mrp: product.mrp,
          price: product.price,
          images: product.images,
          category: product.category,
          inStock: true,
          storeId: store.id
        }
      })
      createdProducts.push(created)
    }

    return NextResponse.json({
      success: true,
      message: 'Products seeded successfully',
      count: createdProducts.length,
      products: createdProducts
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed products', details: error.message },
      { status: 500 }
    )
  }
}
